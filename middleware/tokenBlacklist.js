const TokenBlacklist = {
    tokens: new Set(),
    add(token){
        this.tokens.add(token);
    },
    isBlacklisted(token){
        return this.tokens.has(token);
    }
};

module.exports = TokenBlacklist;