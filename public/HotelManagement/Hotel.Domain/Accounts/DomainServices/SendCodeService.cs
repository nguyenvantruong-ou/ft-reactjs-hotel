using Hotel.Domain.Accounts.DomainServices.Interfaces;
using Hotel.SharedKernel.Email;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Domain.Accounts.DomainServices
{
    public class SendCodeService : ISendCodeService
    {
        private IEmail _mailUtil;
        public SendCodeService(IEmail mailUtil)
        {
            _mailUtil = mailUtil;
        }
        public async Task<int> SendCodeAsync(IConfiguration _configuration, string email)
        {
            await _mailUtil.ConfigMailAsync(_configuration);
            int Code;
            Random generator = new Random();
            Code = generator.Next(100000, 1000000);
            _mailUtil.SendAsync(email, _configuration["Hotel:Name"], Code + _configuration["Email:Content"]);
            return Code;
        }

    }
}
