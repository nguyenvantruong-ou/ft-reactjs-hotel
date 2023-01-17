using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.Areas.Management.Services.Interfaces;
using Hotel.API.DTOs.Constant;
using Hotel.API.DTOs.ResponseDTOs;
using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using System.Net;

namespace Hotel.API.Areas.Management.Controllers
{
    public class StatisticsController : BaseController
    {
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        private IStatisticsService _service;
        public StatisticsController(IUnitOfWork<HotelManagementContext> uow,
                                    IStatisticsService service)
        {
            _uow = uow;
            _service = service;
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("revenue")]
        public async Task<ActionResult> Revenue([FromQuery] RevenueRequestDTO req)
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                                                await _service.StatiscalRevenueAsync(req.Year),
                                                Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("visitor")]
        public async Task<ActionResult> Visitor()
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                                                await _service.StatisticalVisitorAsync(),
                                                Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("amount-customer")]
        public async Task<ActionResult> AmountCustomer()
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                                                await _service.StatisticalAmountCustomerAsync(),
                                                Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }
    }

}
