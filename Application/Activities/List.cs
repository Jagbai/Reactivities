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
        /*IRequest is a mediator interfaces that requires you to tell it what you want to return 
        From the created Query. Here we ask it to return a list of class activiity
        We leave it empty because we're not providing it with any properties since we're going
        to the db to retrieve the propertyiesr*/

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            //Handler requires you to give a query as well as what you wish to return
            private readonly DataContext _context;
            //Dependency injection

            public Handler(DataContext context)
            {
                // Dependency injection
                _context = context;

            }


            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //Created a handle method within the handler class which contains the Query request as well as the cancellationToken

                var activities = await _context.Activities.ToListAsync();
                //Gather all activities to list and return them
                return activities;
            }
        }
    }
}