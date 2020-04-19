using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                // Dependency injection
                _context = context;

            }

            //Created query request and any attributes within Query are passed to request
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Gather all activities to list and return them
                var activities = await _context.Activities.ToListAsync();

                return activities;
            }
        }
    }
}