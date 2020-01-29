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
            string url = "http://ilawebapp.azurewebsites.net/get-db-objects"; 
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
                    using (var response = await httpClient.PostAsync("https://ilawebapp.azurewebsites.net/model/riskscore", stringcontent))
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
            //var client = new HttpClient();
            //client.BaseAddress = new Uri("http://ilawebapp.azurewebsites.net/model/riskscore");
            //var response = await client.PostAsJsonAsync("http://ilawebapp.azurewebsites.net/model/riskscore", request);
            //var responseObject = await response.Content.ReadAsAsync<RiskScore>();
            //return responseObject;

            //var response = new HttpClient().PostAsJsonAsync<RiskScore>("http://ilawebapp.azurewebsites.net/model/riskscore", request).Result;
            //var responseObject = await response.Content.ReadAsAsync<RiskScore>();
            //return responseObject;
        }

        //[HttpPost]
        //public async Task<IActionResult> UpdateReservation(Reservation reservation)
        //{
        //    Reservation receivedReservation = new Reservation();
        //    using (var httpClient = new HttpClient())
        //    {
        //        var content = new MultipartFormDataContent();
        //        content.Add(new StringContent(reservation.Id.ToString()), "Id");
        //        content.Add(new StringContent(reservation.Name), "Name");
        //        content.Add(new StringContent(reservation.StartLocation), "StartLocation");
        //        content.Add(new StringContent(reservation.EndLocation), "EndLocation");

        //        using (var response = await httpClient.PutAsync("http://localhost:8888/api/Reservation", content))
        //        {
        //            string apiResponse = await response.Content.ReadAsStringAsync();
        //            ViewBag.Result = "Success";
        //            receivedReservation = JsonConvert.DeserializeObject<Reservation>(apiResponse);
        //        }
        //    }
        //    return View(receivedReservation);
        //}
        //[HttpPost]
        //public object PostWeatherForecast([FromBody] object weatherForecast)
        //{
        //    var forecast = JObject.Parse(weatherForecast.ToString()).ToObject<WeatherForecast>();
        //    var x = forecast.DateFormatted;
        //    return weatherForecast;
        //}

    }

}
