export type PackingSlip = {
  address: string;
  packageDescription: string;
};

export type MembershipLevel = 'BRONZE' | 'SILVER' | 'GOLD';

export type Membership = {
  id: string;
  level: MembershipLevel;
  email: string;
};

export interface Order {
  packingSlips?: PackingSlip[];
  membership?: Membership;
  agent?: string;
  commissions?: string[];
  customerId: string;
  product: string;
  price: string;
}

export interface Context {
  chargeCustomer: (customerId: string, price: string) => string;
  updateMembershipStatus: (membershipId: string, newMembershipLevel: MembershipLevel) => string;
  createMembership: (email: string, level: MembershipLevel) => string;
  sendPackingSlip: (packingSlip: PackingSlip) => string;
  sendEmail: (emailAddress: string, subject: string, body: string) => string;
}

type OrderWrapper = (order: Order) => Order;

const createOrderWrappers = (context: Context): Record<string, OrderWrapper> => {
  const payment = (order: Order) => {
    const paymentId = context.chargeCustomer(order.customerId, order.price);
    console.log(paymentId);
    return order;
  };

  const withCreateMembership = (order: Order) => {
    if (!order.membership) throw new Error('Missing membership details');
    const { email, level } = order.membership;
    const id = context.createMembership(email, level);
    console.log(`Created membership: ${id}`);
    return {
      ...order,
      membership: {
        id,
        email,
        level,
      },
    };
  };

  const withUpdateMembershipStatus = (order: Order) => {
    if (!order.membership) throw new Error('Missing membership details');

    const { id, level } = order.membership;
    const membershipUpdateResult = context.updateMembershipStatus(id, level);
    console.log(`Update ${id} to ${level} result - ${membershipUpdateResult}`);
    return order;
  };

  const withAdditionalPackingSlipTo =
    (additionalSlip: PackingSlip) =>
    (order: Order): Order => {
      return {
        ...order,
        packingSlips: order.packingSlips ? [...order.packingSlips, additionalSlip] : [additionalSlip],
      };
    };

  const withRoyaltyPackingSlip = (order: Order): Order => {
    const royaltyDepartment: PackingSlip = {
      address: 'royalty dept, XYZ 123',
      packageDescription: 'Royalties',
    };

    console.log(`Added royalty packing slip`);
    return withAdditionalPackingSlipTo(royaltyDepartment)(order);
  };

  const withSendPackingSlips = (order: Order) => {
    if (!order.packingSlips || !order.packingSlips.length) {
      throw new Error('Expected packing slips to send');
    }
    for (const packingSlip of order.packingSlips) {
      const result = context.sendPackingSlip(packingSlip);
      console.log(`Sent packing slip for ${packingSlip.packageDescription} - ${result}`);
    }
    return order;
  };

  const withMembershipUpgradeEmail = (order: Order) => {
    if (!order.membership) throw new Error('Missing membership details');

    const { email, level } = order.membership;
    context.sendEmail(email, `Your ${level} upgrade!`, `Thanks for upgrading!`);
    return order;
  };

  const withMembershipJoiningEmail = (order: Order) => {
    if (!order.membership) throw new Error('Missing membership details');

    const { email, level } = order.membership;
    context.sendEmail(email, `Your New Membership!`, `Thanks for joining as a ${level} member! Click here to upgrade!`);
    return order;
  };

  return {
    payment,
    withRoyaltyPackingSlip,
    withCreateMembership,
    withMembershipJoiningEmail,
    withMembershipUpgradeEmail,
    withSendPackingSlips,
    withUpdateMembershipStatus,
  };
};

export const createOrderProcessors = (context: Context) => {
  const {
    payment,
    withRoyaltyPackingSlip,
    withCreateMembership,
    withMembershipJoiningEmail,
    withMembershipUpgradeEmail,
    withSendPackingSlips,
    withUpdateMembershipStatus,
  } = createOrderWrappers(context);

  const membershipLevelUpdate = (order) => payment(withMembershipUpgradeEmail(withUpdateMembershipStatus(order)));
  const membershipCreation = (order) => payment(withMembershipJoiningEmail(withCreateMembership(order)));
  const physicalProductOrder = (order) => payment(withSendPackingSlips(order));
  const bookOrder = (order) => physicalProductOrder(withRoyaltyPackingSlip(order));

  return {
    basicPayment: payment,
    bookOrder,
    membershipLevelUpdate,
    membershipCreation,
    physicalProductOrder,
  };
};
