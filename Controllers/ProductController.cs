using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace cad.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("getProduct")]
        public async Task<ActionResult<string>> Get()
        {
            string url = "http://ilawebapp.azurewebsites.net/products";
            string queryString = Request.QueryString.ToString().ToLower();
            if (!string.IsNullOrEmpty(queryString))
            {
                url = url + "?query" + queryString;
            }

            using (HttpClient client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
        }

        [HttpGet]
        [Route("getProduct/{productId}")]
        public async Task<ActionResult<string>> Get(string productId)
        {
            string url = "http://ilawebapp.azurewebsites.net/products";
            using (HttpClient client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
        }

    }
}