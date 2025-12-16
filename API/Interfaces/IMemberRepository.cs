
using API.Entities;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Member>> GetMembersAsync();
    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId);
    Task<Member?> GetMemberByIdAsync(string id);
    Task<Member?> GetMemberForUpdate(string id);

}
