using Hotel.Domain.Rooms.Entities;
using Hotel.Domain.Rooms.Repositories;
using Hotel.Domain.Interfaces;
using Hotel.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Infrastructure.Data.Rooms
{
    public class ImageManagementRepository : RepositoryBase<Image>, IImageManagementRepository
    {
        public ImageManagementRepository(HotelManagementContext context) : base(context)
        {

        }

        public Task AddEntityAsync(Image Entity)
        {
            throw new NotImplementedException();
        }

        public Task AddEntityAsync(Domain.Rooms.Entity.Image entity)
        {
            throw new NotImplementedException();
        }

        public async Task AddListImageAsync(List<string> listImage, int roomId)
        {
            listImage.ForEach(s =>
            {
                Image NewImage = new Image();
                NewImage.Link = s;
                NewImage.RoomId = roomId;
                DbSet.Add(NewImage);
            });
        }

        public Task DeleteEntityAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteListImageAsync(int roomId)
        {
            List<Image> ListImage = DbSet.Where(s => s.RoomId == roomId).ToList();
            ListImage.ForEach(s => DbSet.Remove(s));
        }

        public Task<Image> GetEntityByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Image> GetEntityByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Image>> GetImagesAsync(int roomId)
        {
            return DbSet.Where(s => s.RoomId == roomId).ToList();
        }

        public Task UpdateEntityAsync(Image req)
        {
            throw new NotImplementedException();
        }

        public Task UpdateEntityAsync(Domain.Rooms.Entity.Image req)
        {
            throw new NotImplementedException();
        }

    }
}
