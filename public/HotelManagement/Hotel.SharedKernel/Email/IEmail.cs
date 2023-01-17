using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Hotel.SharedKernel.Email
{
    public interface IEmail
    {
        Task ConfigMailAsync(IConfiguration Configuration);
        Task SendAsync(string toEmail, string subject, string content);
    }
}
