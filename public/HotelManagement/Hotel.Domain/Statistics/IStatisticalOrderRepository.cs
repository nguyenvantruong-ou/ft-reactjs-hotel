using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Statistics
{
    public interface IStatisticalOrderRepository
    {
        Task<int> GetCapitaAsync(int capita);
        Task<int?> GetCountCustomerAsync(int year);
    }
}
