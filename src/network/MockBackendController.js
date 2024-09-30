export class MockBackendController {
    static handleInit(uid) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let existingData = MockBackendController.getUserData(uid);
                if (!existingData) {
                    existingData = MockBackendController.getBasicUserConfig();
                    MockBackendController.setUserData(uid, existingData);
                }
                resolve(existingData);
            }, 500);
        });
    }

    static handleSpin(uid, bet) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let userData = MockBackendController.getUserData(uid);

                if (!userData) {
                    userData = MockBackendController.getBasicUserConfig(uid);
                }

                if (userData.balance < bet) {
                    resolve({
                        error: "Insufficient balance",
                        balance: userData.balance
                    });

                    return;
                }

                userData.balance -= bet;
                userData.last_bet = bet;

                const isWin = Math.random() < 0.25;
                let winAmount = 0;
                let newRolls;

                if (isWin) {
                    const winPattern = MockBackendController.getRandomWinPattern();
                    newRolls = winPattern.pattern;
                    winAmount = winPattern.multiplier * bet;
                    userData.balance += winAmount;
                } else {
                    newRolls = MockBackendController.generateRandomNonWinRolls();
                }

                userData.rolls = newRolls;
                MockBackendController.setUserData(uid, userData);

                const response = {
                    uid: uid,
                    balance: userData.balance,
                    last_bet: userData.last_bet,
                    rolls: userData.rolls
                };

                if (winAmount > 0) {
                    response.win = winAmount;
                }

                resolve(response);
            }, 500);
        });
    }

    static getBasicUserConfig(uid) {
        return {
            uid: uid,
            balance: 1000,
            last_bet: 10,
            bets: [10, 20, 50, 100],
            rolls: [[8, 3, 9], [9, 9, 4], [5, 6, 3]]
        };
    }

    static getUserData(uid) {
        const data = localStorage.getItem(`user_${uid}`);

        return data ? JSON.parse(data) : null;
    }

    static setUserData(uid, data) {
        localStorage.setItem(`user_${uid}`, JSON.stringify(data));
    }

    static getPredefinedWinPatterns() {
        return [
            {
                pattern: [[1, 2, 3], [1, 2, 3], [1, 2, 3]],
                multiplier: 3
            },
            {
                pattern: [[1, 3, 5], [1, 3, 5], [1, 3, 5]],
                multiplier: 5
            },
            {
                pattern: [[1, 5, 7], [1, 5, 7], [1, 5, 7]],
                multiplier: 10
            },
            {
                pattern: [[3, 7, 9], [3, 7, 9], [3, 7, 9]],
                multiplier: 25
            }
        ];
    }

    static getRandomWinPattern() {
        const patterns = MockBackendController.getPredefinedWinPatterns();
        const randomIndex = Math.floor(Math.random() * patterns.length);

        return patterns[randomIndex];
    }

    static generateRandomNonWinRolls() {
        let rolls;
        do {
            rolls = [
                MockBackendController.generateRandomRow(),
                MockBackendController.generateRandomRow(),
                MockBackendController.generateRandomRow()
            ];
        } while (MockBackendController.isWinningPattern(rolls));

        return rolls;
    }

    static generateRandomRow() {
        const row = [];
        for (let i = 0; i < 3; i++) {
            row.push(Math.floor(Math.random() * 9) + 1);
        }

        return row;
    }

    static checkWin(rolls) {
        const patterns = MockBackendController.getPredefinedWinPatterns();

        for (const patternObj of patterns) {
            const pattern = patternObj.pattern;
            if (MockBackendController.areRollsEqual(rolls, pattern)) {
                return patternObj.amount;
            }
        }

        return 0;
    }

    static isWinningPattern(rolls) {
        return MockBackendController.checkWin(rolls) > 0;
    }

    static areRollsEqual(rolls1, rolls2) {
        if (rolls1.length !== rolls2.length) return false;
        for (let i = 0; i < rolls1.length; i++) {
            const row1 = rolls1[i];
            const row2 = rolls2[i];
            if (row1.length !== row2.length) return false;
            for (let j = 0; j < row1.length; j++) {
                if (row1[j] !== row2[j]) return false;
            }
        }

        return true;
    }
}