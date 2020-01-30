using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace cad.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GenericController : ControllerBase
    {
        private readonly ILogger<GenericController> _logger;

        public GenericController(ILogger<GenericController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<string>> Get()
        {
            string url = "https://svcsexplorers.azurewebsites.net/get-db-objects"; 
            using (HttpClient client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
        }

        [HttpPost]
        public async Task<RiskScore> Post([FromBody] RiskScore request)
        {
            RiskScore objRiskSCoreResponse = new RiskScore();
            var json = JsonConvert.SerializeObject(request);
            var stringcontent = new StringContent(json, UnicodeEncoding.UTF8, "application/json");
            try
            {
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.PostAsync("https://svcsexplorers.azurewebsites.net/model/riskscore", stringcontent))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();

                        objRiskSCoreResponse = JsonConvert.DeserializeObject<Response>(apiResponse).responseObject;
                    }

                }
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex);
            }
            return objRiskSCoreResponse;
            
        }

    }
}
