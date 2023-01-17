using Hotel.Domain.Accounts.Entities;

namespace Hotel.Domain.Accounts.DomainServices.Interfaces
{
    public interface IConvertToAccountService
    {
        Account ConvertAccount(string email, string password, string firstName, string lastName, 
                               int gender,string cardId, string phoneNumber, string address);
        string GetGender(int type);

    }
}
