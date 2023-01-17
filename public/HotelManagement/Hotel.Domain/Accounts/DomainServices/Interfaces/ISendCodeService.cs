using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.DomainServices.Interfaces
{
    public interface ISendCodeService
    {
        Task<int> SendCodeAsync(IConfiguration _configuration, string email);
    }
}
