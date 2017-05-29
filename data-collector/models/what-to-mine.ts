    export interface Coin {
        tag: string;
        algorithm: string;
        block_time: string;
        block_reward: number;
        block_reward24: number;
        last_block: number;
        difficulty: number;
        difficulty24: number;
        nethash: string;
        exchange_rate: number;
        exchange_rate24: number;
        exchange_rate_vol: number;
        exchange_rate_curr: string;
        market_cap: string;
        estimated_rewards: string;
        estimated_rewards24: string;
        btc_revenue: string;
        btc_revenue24: string;
        profitability: number;
        profitability24: number;
        lagging: boolean;
        timestamp: number;
    }
