using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
