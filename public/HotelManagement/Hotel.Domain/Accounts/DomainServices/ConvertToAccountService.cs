using Hotel.Domain.Accounts.Constant;
using Hotel.Domain.Accounts.DomainServices.Interfaces;
using Hotel.Domain.Accounts.Entities;

namespace Hotel.API.DomainServices
{
    public class ConvertToAccountService : IConvertToAccountService
    {
        public Account ConvertAccount(string email, string password, string firstName, string lastName, 
                                        int gender, string cardId, string phoneNumber, string address)
        {
            var Acc = new Account();
            Acc.Email = email;
            Acc.Password = password;
            Acc.FirstName = firstName;
            Acc.LastName = lastName;
            Acc.Gender = GetGender(gender);
            Acc.CardId = cardId;
            Acc.PhoneNumber = phoneNumber;
            Acc.Address = address;

            return Acc;
        }

        public string GetGender(int type)
        {
            if (type == 1)
                return Gender.Male;
            return type == 2 ? Gender.Female : Gender.Other;
        }
    }
}
