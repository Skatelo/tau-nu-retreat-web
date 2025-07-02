const Timeline = () => {
  const timelineData = [
    {
      day: "Friday, July 12th",
      events: [
        {
          time: "2:00 PM - 5:00 PM",
          title: "Arrival & Check-in",
          description: "Hotel Lobby Registration",
          location: "Charlotte Marriott City Center"
        },
        {
          time: "6:00 PM - 7:30 PM",
          title: "Welcome Dinner",
          description: "Official welcome and icebreakers",
          location: "Hotel Banquet Room"
        },
        {
          time: "8:00 PM - 10:00 PM",
          title: "Brotherhood Bonding",
          description: "Informal gathering and fellowship",
          location: "Hotel Lounge"
        }
      ]
    },
    {
      day: "Saturday, July 13th",
      events: [
        {
          time: "7:30 AM - 9:00 AM",
          title: "Breakfast",
          description: "Continental breakfast",
          location: "Hotel Dining Area"
        },
        {
          time: "9:30 AM - 11:30 AM",
          title: "Strategic Planning Session",
          description: "Chapter goals and initiatives discussion",
          location: "Conference Room A"
        },
        {
          time: "12:00 PM - 1:00 PM",
          title: "Lunch",
          description: "Group lunch and casual discussions",
          location: "Hotel Restaurant"
        },
        {
          time: "1:30 PM - 4:00 PM",
          title: "Community Service Project",
          description: "Group volunteer activity in Charlotte",
          location: "Charlotte Community Center"
        },
        {
          time: "6:00 PM - 9:00 PM",
          title: "Formal Dinner & Speaker",
          description: "Guest speaker and brotherhood celebration",
          location: "Hotel Grand Ballroom"
        }
      ]
    },
    {
      day: "Sunday, July 14th",
      events: [
        {
          time: "8:00 AM - 9:30 AM",
          title: "Breakfast",
          description: "Group breakfast",
          location: "Hotel Dining Area"
        },
        {
          time: "10:00 AM - 11:00 AM",
          title: "Brotherhood Circle",
          description: "Reflection and brotherhood affirmation",
          location: "Conference Room B"
        },
        {
          time: "11:30 AM - 12:30 PM",
          title: "Closing Session",
          description: "Final remarks and future planning",
          location: "Conference Room A"
        },
        {
          time: "1:00 PM",
          title: "Check-out & Departure",
          description: "Safe travels to all brothers",
          location: "Hotel Lobby"
        }
      ]
    }
  ];

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-center mb-8 text-primary">
        Retreat Schedule
      </h3>
      <div className="w-full overflow-x-hidden relative">
        <div className="timeline-scroll flex min-w-max">
          {/* Render timeline twice for continuous scrolling */}
          {[...timelineData, ...timelineData].map((day, dayIndex) => (
            <div 
              key={dayIndex}
              className="min-w-[350px] mr-12 p-6 bg-background/70 border-2 border-primary rounded-lg shadow-lg"
            >
              <h3 className="text-primary text-xl font-bold mb-4 border-b border-primary pb-2">
                {day.day}
              </h3>
              {day.events.map((event, eventIndex) => (
                <div 
                  key={eventIndex}
                  className="mb-4 pb-4 border-b border-primary/30 last:border-b-0 last:mb-0 last:pb-0"
                >
                  <p className="font-bold text-primary text-sm mb-1">
                    {event.time}
                  </p>
                  <p className="font-bold text-foreground mb-1">
                    {event.title}
                  </p>
                  <p className="text-foreground text-sm mb-1">
                    {event.description}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;