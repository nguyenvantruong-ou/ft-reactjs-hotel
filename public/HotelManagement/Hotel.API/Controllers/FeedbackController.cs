using Hotel.API.DTOs.RequestDTOs;
using Hotel.API.Utils;
using Hotel.Domain.Feedbacks.Entities;
using Hotel.Domain.Feedbacks.Repositories;
using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using static System.Net.WebRequestMethods;

namespace Hotel.API.Controllers
{
    public class FeedbackController : BaseController
    {
        private IFeedbackRepository _repo;
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        public FeedbackController(IFeedbackRepository repo, 
                                  IUnitOfWork<HotelManagementContext> uow)
        {
            _repo = repo;
            _uow = uow;
        }

        [HttpPost]
        [Authorize(Roles = "USER")]
        public async Task<ActionResult> AddFeedback([FromBody] FeedbackCreateRequestDTO req)
        {

            //var Input = new Feedback();
            //Input.Content = Req.Content;
            //await _repo.AddEntityAsync(Input);
            //_uow.CompleteAsync();
            return Ok();
        }
    }
}
