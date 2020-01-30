using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace cad.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecommendationController : ControllerBase
    {
        private readonly ILogger<RecommendationController> _logger;

        public RecommendationController(ILogger<RecommendationController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{model}")]
        public async Task<ActionResult<string>> Get(string model)
        {
            string url = "https://recomapi.azurewebsites.net/api/products";
            url = url + "?model=" + model;
            using (HttpClient client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
        }
    }
}