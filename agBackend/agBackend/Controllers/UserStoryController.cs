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


        [HttpGet("sprint/{id}")]
        public IActionResult GetAllBySprint(int id)
        {
            var model = _userStoryService.GetAllBySprint(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]UserStoryCreateModel model)
        {
            var userStoryModel = _mapper.Map<UserStoryModel>(model);

            try
            {
                _userStoryService.Create(userStoryModel);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("project/{id}")]
        public IActionResult GetAllByProject(int id)
        {
            var model = _userStoryService.GetAllByProject(id);

            if (model == null)
                return NotFound();

            return Ok(model);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userStoryService.Delete(id);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserStoryUpdateModel model)
        {
            var userStoryModel = _mapper.Map<UserStoryModel>(model);
            userStoryModel.Id = id;

            try
            {
                _userStoryService.Update(userStoryModel);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var userStory = _userStoryService.GetById(id);

            if (userStory == null)
                return NotFound();

            return Ok(userStory);
        }

    }
}