const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
    it("Returns the literal '0' when given no input", () => {
        const trivialKey = deterministicPartitionKey();
        expect(trivialKey).toBe("0");
    });

    it("returns the hash value when given input", () => {
        const trivialKey = deterministicPartitionKey(10);
        expect(trivialKey).toBe("0af1abec626b095704a5b03c13e47c3c18bcedb78566b6cadc4d5201cdb27691ce62fe60835587d41c8290616ad4ff1018b14dac6f83ff005922b25925fa4e6a");
    });

    it("returns the hash value of the event when given input has no partitionKey", () => {
        const event = {
            noPartitionKey: 'unknown'
        };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("b3e7f47c8c8f6e8af6a1cce36d303e9e85bee28354c3e10d7ba21d283d1c854fbf225f761b220f9f0dd1a7cb2043978369c8e4b1492b85abf7e6cdac2bb2ad57");
    });

    it("returns the value when given input has partitionKey", () => {
        const event = {
            partitionKey: 15
        };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("15");
    });

    it("returns the hash value candidate length is greater that max partition key length", () => {
        const event = {
            partitionKey: 512
        };
        const trivialKey = deterministicPartitionKey(event);
        expect(trivialKey).toBe("512");
    });
});