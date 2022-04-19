import { Context, createOrderProcessors, Order, PackingSlip } from '..';

const mockContext: Context = {
  chargeCustomer: jest.fn(),
  createMembership: jest.fn(),
  sendEmail: jest.fn(),
  sendPackingSlip: jest.fn(),
  updateMembershipStatus: jest.fn(),
};

const mockOrder: Order = {
  customerId: '1234567',
  price: '£44',
  product: 'Some product',
};

const mockPackingSlip: PackingSlip = {
  address: '123 address street',
  packageDescription: 'some product',
};

describe('orderProcessors', () => {
  let processors;

  beforeAll(() => {
    processors = createOrderProcessors(mockContext);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic order', () => {
    it('charges the customer', () => {
      processors.basicPayment(mockOrder);
      expect(mockContext.chargeCustomer).toBeCalledWith('1234567', '£44');
    });
  });

  describe('physical order', () => {
    it('sends packing slips', () => {
      processors.physicalProductOrder({
        ...mockOrder,
        packingSlips: [mockPackingSlip],
      });

      expect(mockContext.sendPackingSlip).toBeCalledWith(mockPackingSlip);
    });

    it('errors if missing packing slips', () => {
      expect(() => processors.physicalProductOrder(mockOrder)).toThrowError();
    });
  });

  describe('book order', () => {
    it('sends packing slips', () => {
      processors.bookOrder({
        ...mockOrder,
        packingSlips: [mockPackingSlip],
      });

      expect(mockContext.sendPackingSlip).toBeCalledWith(mockPackingSlip);
      expect(mockContext.sendPackingSlip).toBeCalledWith({
        address: 'royalty dept, XYZ 123',
        packageDescription: 'Royalties',
      });
    });
  });

  describe('membership creation', () => {});
  
  describe('membership level update', () => {});
});
