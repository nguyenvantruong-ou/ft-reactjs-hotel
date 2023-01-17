namespace Hotel.API.Utils;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Hotel.Domain;
using System.Net;
using System.Text;
using System.Security.Claims;
using Hotel.API.DTOs.RequestDTOs;
using Hotel.API.DTOs.Constant;
using Hotel.Domain.Accounts.Entities;

public class JwtUtil
    {
        public static string GetToken(IConfiguration Configuration, Account Req)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                Configuration["Jwt:Issuer"],
                Configuration["Jwt:Audience"],
                new[]
                {
                        new Claim(ClaimTypes.NameIdentifier, Req.Email),
                        new Claim(ClaimTypesJwt.LastName, Req.LastName),
                        new Claim(ClaimTypesJwt.FirstName, Req.FirstName),
                        new Claim(ClaimTypesJwt.CardId, Req.CardId),
                        new Claim(ClaimTypesJwt.PhoneNumber, Req.PhoneNumber),
                        new Claim(ClaimTypes.Role, Req.Role.RoleName)
                },
                expires: DateTime.Now.AddDays(15),
                signingCredentials: credentials
             );

        return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GetTokenRegister(IConfiguration Configuration, int Code, string Email)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                Configuration["Jwt:Issuer"],
                Configuration["Jwt:Audience"],
                new[]
                {
                            new Claim(ClaimTypesJwt.Code, Code.ToString()),
                            new Claim(ClaimTypes.Email, Email)
                },
                expires: DateTime.Now.AddDays(15),
                signingCredentials: credentials
             );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
}
