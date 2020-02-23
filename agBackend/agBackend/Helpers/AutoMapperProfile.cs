using AutoMapper;
using agBackend.Entities;
using agBackend.Models;

namespace agBackend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() {
            CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            CreateMap<UpdateModel, User>();
            CreateMap<EngineeringTaskUpdateModel, EngineeringTaskModel>();
            CreateMap<EngineeringTaskCreateModel, EngineeringTaskModel>();
            CreateMap<UserStoryCreateModel, UserStoryModel>();

        }
    }
}
