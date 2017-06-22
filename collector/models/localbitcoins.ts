  export interface Profile {
      username: string;
      feedback_score: number;
      trade_count: string;
      last_online: Date;
      name: string;
  }

  export interface Data2 {
      profile: Profile;
      require_feedback_score: number;
      hidden_by_opening_hours: boolean;
      trade_type: string;
      ad_id: number;
      temp_price: string;
      bank_name: string;
      payment_window_minutes: number;
      trusted_required: boolean;
      min_amount: string;
      visible: boolean;
      require_trusted_by_advertiser: boolean;
      temp_price_usd: string;
      lat: number;
      age_days_coefficient_limit: string;
      is_local_office: boolean;
      first_time_limit_btc?: any;
      atm_model?: any;
      city: string;
      location_string: string;
      countrycode: string;
      currency: string;
      limit_to_fiat_amounts: string;
      created_at: Date;
      max_amount: string;
      lon: number;
      is_low_risk: boolean;
      sms_verification_required: boolean;
      require_trade_volume: number;
      online_provider: string;
      max_amount_available: string;
      msg: string;
      require_identification: boolean;
      email?: any;
      volume_coefficient_btc: string;
  }

  export interface Actions {
      public_view: string;
  }

  export interface AdList {
      data: Data2;
      actions: Actions;
  }

  export interface Data {
      ad_list: AdList[];
      ad_count: number;
  }

  export interface LocalBitCoinsData {
      data: Data;
  }

