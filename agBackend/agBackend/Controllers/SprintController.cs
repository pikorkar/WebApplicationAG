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
    public class SprintController : ControllerBase
    {
        private ISprintService _userSprintService;
        private IMapper _mapper;

        public SprintController(ISprintService userSprintService,
            IMapper mapper)
        {
            _userSprintService = userSprintService;
            _mapper = mapper;
        }

        //GET all by Project
        [HttpGet("project/{id}")]
        public IActionResult GetAllByProject(int id)
        {
            var model = _userSprintService.GetAllByProject(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }

    }
}
