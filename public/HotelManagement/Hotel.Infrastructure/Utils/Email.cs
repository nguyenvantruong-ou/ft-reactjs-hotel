using Hotel.SharedKernel.Email;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Hotel.Infrastructure.Utils
{
    public class Email : IEmail
    {
        private string Username { get; set; }
        private string Password { get; set; }
        private int Port { get; set; }
        private string Host { get; set; }
        private bool EnableSsl { get; set; }
        private bool UseDefaultCredentials { get; set; }
        private bool IsBodyHtml { get; set; }

        public async Task ConfigMailAsync(IConfiguration Configuration)
        {
            Username = Configuration["Email:Username"];
            Password = Configuration["Email:Password"];
            Port = int.Parse(Configuration["Email:Port"]);
            Host = Configuration["Email:Host"];
            EnableSsl = bool.Parse(Configuration["Email:EnableSsl"]);
            UseDefaultCredentials = bool.Parse(Configuration["Email:UseDefaultCredentials"]);
            IsBodyHtml = bool.Parse(Configuration["Email:IsBodyHtml"]);
        }

        public async Task SendAsync(string toEmail, string subject, string content)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            message.From = new MailAddress(Username, "TRUONG VAN Hotel");
            message.To.Add(new MailAddress(toEmail));
            message.Subject = subject;
            message.IsBodyHtml = IsBodyHtml;
            message.Body = content;
            smtp.Port = Port;
            smtp.Host = Host;
            smtp.EnableSsl = EnableSsl;
            smtp.UseDefaultCredentials = UseDefaultCredentials;
            smtp.Credentials = new NetworkCredential(Username, Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.Send(message);
        }
    }
}
