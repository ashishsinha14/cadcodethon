using System;

namespace cad
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }

    public class Database
    {
        public string DataBaseName { get; set; }
    }

    public class Response
    {
        public RiskScore responseObject { get; set; }

        public string successMessage { get; set; }

        public string errorMessage { get; set; }
    }

    public class RiskScore
    {
        public int rownum { get; set; }
        public string account_name { get; set; }
        public string inv_horizon { get; set; }
        public int inv_obj_least { get; set; }
        public int inv_obj_most { get; set; }
        public int inv_obj_imp { get; set; }
        public int inv_obj_some_imp { get; set; }
        public int inv_amount { get; set; }
        public string liquidy_need { get; set; }
        public int? model_id { get; set; }
        public string model_name { get; set; }
        public string primary_fin_need { get; set; }
        public int risk_profile { get; set; }
        public int risk_tolerance { get; set; }
        public decimal volatility { get; set; }
       
    }
}
