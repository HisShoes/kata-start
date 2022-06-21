type Schema = {
  key: string;
};

type SchemaObject = Record<string, Schema>;

// input ['-p', '8080']
// output { port: 8080 }

export const createArgsParser = (schema: SchemaObject) => {
  return (args: string[]) => {
    let argsObject = {};

    args.forEach(function (arg) {
        if (schema[arg]){

        }
    });

    return argsObject;
  };
};
