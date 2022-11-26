import * as user from "../user";

describe("user handler", () => {
    it("should create a new user", async () => {
        const req = { body: { username: "kitan", password: "kitic" } };
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            },
        };
        const newuser = await user.createNewUser(req, res, () => {});
    });
});
