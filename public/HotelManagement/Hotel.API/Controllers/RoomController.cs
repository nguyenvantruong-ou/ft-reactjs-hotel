using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using Hotel.API.DTOs.ResponseDTOs;
using System.Net;
using Hotel.API.DTOs.Constant;
using Hotel.Domain.Rooms.DomainServices.Interfaces;
using Hotel.API.DTOs.RequestDTOs;

namespace Hotel.API.Controllers
{
    public class RoomController : BaseController
    {
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        private readonly IReadRoomService _service;
        public RoomController(IUnitOfWork<HotelManagementContext> uow, 
                              IReadRoomService service)
        {
            _uow = uow;
            _service = service;
        }

        [HttpGet("rooms")]
        public async Task<ActionResult> ReadRooms([FromQuery] SearchPagingRequestDTO req)
        {
            try
            {

                var results = await _service.ReadRoomsAsync(req.Kw, req.PageSize, req.Page, req.Sort);
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                    new PagingResponseDTO(await _service.GetPageMaxAsync(req.Kw, req.PageSize), results.Select(_=>new RoomsHomeResponse(_))),
                    Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }
    }
}
