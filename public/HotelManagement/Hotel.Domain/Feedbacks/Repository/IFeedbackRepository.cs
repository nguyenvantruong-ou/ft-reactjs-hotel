using Hotel.Domain.Feedbacks.Entity;
using Hotel.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Feedbacks.Repository
{
    public interface IFeedbackRepository : IRepository<Feedback>
    {
        Task<List<Feedback>> GetListFeedbackAsync(int Id);
    }
}
