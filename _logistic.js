const logistic_func = (offset, scale, rate) => (x) => scale / (1 + Math.exp(-rate * (x - offset)))
