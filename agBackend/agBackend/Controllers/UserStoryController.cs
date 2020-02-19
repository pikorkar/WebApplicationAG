using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using agBackend.Services;
using agBackend.Models;
using agBackend.Entities;
using AutoMapper;
using agBackend.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using System.Collections.Generic;

namespace agBackend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserStoryController : ControllerBase
    {
        private IUserStoryService _userStoryService;
        private IMapper _mapper;

        public UserStoryController(IUserStoryService userStoryService,
            IMapper mapper) {
            _userStoryService = userStoryService;
            _mapper = mapper;
        }



    }
}