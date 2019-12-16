import { AssertionError } from "assert";

function assert(condition: any, message: string): asserts condition {
    if (!condition) {
        throw new AssertionError({ message });
    }
}
export default assert;