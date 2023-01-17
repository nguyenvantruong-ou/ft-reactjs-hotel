using Hotel.API.Areas.Management.DTOs.RequestDTO;
using Hotel.API.Areas.Management.Services.Interfaces;
using Hotel.API.DTOs.Constant;
using Hotel.API.DTOs.ResponseDTOs;
using Hotel.Domain.Rooms.Repositories;
using Hotel.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Hotel.API.Controllers;
using Hotel.Domain;
using System.Net;

namespace Hotel.API.Areas.Management.Controllers
{
    public class RoomManagementController : BaseController
    {
        private readonly IRoomManagementRepository _repo;
        private readonly IImageManagementRepository _repoImage;
        private readonly IUnitOfWork<HotelManagementContext> _uow;
        private readonly IRoomManagementService _service;
        public RoomManagementController(IRoomManagementRepository repo,
                                        IUnitOfWork<HotelManagementContext> uow,
                                        IRoomManagementService service,
                                        IImageManagementRepository repoImage)
        {
            _repo = repo;
            _uow = uow;
            _service = service;
            _repoImage = repoImage;
        }

        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpGet("rooms")]
        public async Task<ActionResult> ReadRooms([FromQuery] SearchRequestDTO req)
        {
            try
            {
                var results = _repo.GetRooms(req.Kw, req.Sort);
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,
                    results.Skip(req.PageSize * (req.Page - 1)).Take(req.PageSize).ToList(),
                    Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest,
                    null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpGet("room-images/{id}")]
        public async Task<ActionResult> ReadImages(int id)
        {
            try
            {
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, _repoImage.GetImagesAsync(id), Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest,
                    null, Message.Error, e.Message));
            }
        }


        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpGet("room/{id}")]
        public async Task<ActionResult> ReadRoom(int id)
        {
            try
            {
                var result = await _repo.GetEntityByIDAsync(id);
                if (result == null)
                    return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.NotExist));
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, result , Message.Ok));
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpDelete("room/{id}")]
        public async Task<ActionResult> DeleteRoom(int id)
        {
            try
            {
                await _repo.DeleteEntityAsync(id);
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok));
            }
            catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpPost("room")]
        public async Task<ActionResult> CreateRoom([FromForm] RoomRequestDTO req)
        {
            try
            {
                if(await _repo.IsExistNameAsync(req.RoomName))
                {
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.NameExist));
                }
                var Room = await _service.ConvertToRoomAsync(req);
                Room.Slug = await _service.CreateSlug(req.RoomName);
                await _repo.AddEntityAsync(Room);
                await _uow.CompleteAsync();
                var ListImages = await _service.UploadImageAsync(req.ListImage);
                await _repoImage.AddListImageAsync(ListImages, await _repo.GetRoomIdLatestAsync());
                await _uow.CompleteAsync();
                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK, Message.Ok)) ;
            } catch (Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }

        [Authorize(Roles = "ADMIN, STAFF")]
        [HttpPut("room")]
        public async Task<ActionResult> UpdateRoom([FromForm] RoomRequestDTO req)
        {
            try
            {
                if (await _repo.IsExistNameByIdAsync(req.RoomName, req.Id))
                {
                    return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, Message.NameExist));
                }

                if (req.ListImage != null)
                { 
                    // images
                    await _repoImage.DeleteListImageAsync(req.Id);
                    var ListImages = await _service.UploadImageAsync(req.ListImage);
                    await _repoImage.AddListImageAsync(ListImages, req.Id);
                }

                // update room
                var Room = await _service.ConvertToRoomAsync(req);
                Room.Slug = await _service.CreateSlug(req.RoomName);
                Room.Id = req.Id;
                await _repo.UpdateEntityAsync(Room);
                await _uow.CompleteAsync();

                return Ok(new CommonResponseDTO((int)HttpStatusCode.OK,Message.Ok));
            } catch(Exception e)
            {
                return BadRequest(new CommonResponseDTO((int)HttpStatusCode.BadRequest, null, Message.Error, e.Message));
            }
        }
    }
}
