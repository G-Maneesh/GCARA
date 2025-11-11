export interface ClimateData {
  temperature: number;
  co2Level: number;
  rainfall: number;
  alerts: Array<{ type: string; message: string; severity: 'normal' | 'warning' | 'critical' }>;
  timestamp: string;
}

export interface FinanceData {
  stockIndices: { name: string; value: number; change: number }[];
  currencyRates: { pair: string; rate: number; change: number }[];
  volatilityIndex: number;
  timestamp: string;
}

export interface HealthData {
  outbreaks: { disease: string; cases: number; region: string }[];
  vaccinationRate: number;
  healthAlerts: Array<{ message: string; severity: 'normal' | 'warning' | 'critical' }>;
  timestamp: string;
}

export interface EnergyData {
  globalGeneration: number;
  oilPrice: number;
  gasPrice: number;
  renewablePercentage: number;
  timestamp: string;
}

export interface AIInsight {
  prediction: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  actions: string[];
  domain: string;
}

const generateClimateData = (): ClimateData => {
  const baseTemp = 15 + Math.random() * 5;
  const baseCO2 = 410 + Math.random() * 20;

  return {
    temperature: parseFloat(baseTemp.toFixed(1)),
    co2Level: parseFloat(baseCO2.toFixed(1)),
    rainfall: parseFloat((Math.random() * 100).toFixed(1)),
    alerts: [
      {
        type: 'Temperature',
        message: baseTemp > 18 ? 'Above average temperatures detected' : 'Normal temperature range',
        severity: baseTemp > 18 ? 'warning' : 'normal'
      }
    ],
    timestamp: new Date().toISOString()
  };
};

const generateFinanceData = (): FinanceData => {
  return {
    stockIndices: [
      { name: 'S&P 500', value: 4500 + Math.random() * 200, change: -2 + Math.random() * 4 },
      { name: 'NASDAQ', value: 14000 + Math.random() * 500, change: -2 + Math.random() * 4 },
      { name: 'FTSE 100', value: 7500 + Math.random() * 200, change: -2 + Math.random() * 4 }
    ],
    currencyRates: [
      { pair: 'EUR/USD', rate: 1.08 + Math.random() * 0.02, change: -0.01 + Math.random() * 0.02 },
      { pair: 'GBP/USD', rate: 1.26 + Math.random() * 0.02, change: -0.01 + Math.random() * 0.02 }
    ],
    volatilityIndex: parseFloat((15 + Math.random() * 10).toFixed(2)),
    timestamp: new Date().toISOString()
  };
};

const generateHealthData = (): HealthData => {
  return {
    outbreaks: [
      { disease: 'Influenza', cases: Math.floor(Math.random() * 10000), region: 'North America' },
      { disease: 'Dengue', cases: Math.floor(Math.random() * 5000), region: 'Southeast Asia' }
    ],
    vaccinationRate: parseFloat((70 + Math.random() * 15).toFixed(1)),
    healthAlerts: [
      {
        message: 'Seasonal flu activity increasing',
        severity: 'warning'
      }
    ],
    timestamp: new Date().toISOString()
  };
};

const generateEnergyData = (): EnergyData => {
  return {
    globalGeneration: parseFloat((25000 + Math.random() * 5000).toFixed(0)),
    oilPrice: parseFloat((75 + Math.random() * 15).toFixed(2)),
    gasPrice: parseFloat((3.5 + Math.random() * 1.5).toFixed(2)),
    renewablePercentage: parseFloat((28 + Math.random() * 5).toFixed(1)),
    timestamp: new Date().toISOString()
  };
};

const generateAIInsights = (): AIInsight[] => {
  const insights = [
    {
      prediction: 'Rising financial instability in Asia-Pacific region',
      riskLevel: 'medium' as const,
      confidence: 72,
      actions: ['Monitor currency fluctuations', 'Review investment portfolios', 'Strengthen financial reserves'],
      domain: 'Finance'
    },
    {
      prediction: 'High probability of heatwave in next 7 days',
      riskLevel: 'high' as const,
      confidence: 85,
      actions: ['Issue public health warnings', 'Prepare cooling centers', 'Monitor vulnerable populations'],
      domain: 'Climate'
    },
    {
      prediction: 'Potential energy shortage during peak demand',
      riskLevel: 'medium' as const,
      confidence: 68,
      actions: ['Increase renewable energy output', 'Optimize grid distribution', 'Prepare backup systems'],
      domain: 'Energy'
    }
  ];

  return insights.sort(() => Math.random() - 0.5).slice(0, 2);
};

export const apiService = {
  getClimateData: async (): Promise<ClimateData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateClimateData();
  },

  getFinanceData: async (): Promise<FinanceData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateFinanceData();
  },

  getHealthData: async (): Promise<HealthData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateHealthData();
  },

  getEnergyData: async (): Promise<EnergyData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateEnergyData();
  },

  getAIInsights: async (): Promise<AIInsight[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateAIInsights();
  }
};
