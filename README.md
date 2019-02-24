# Productivity Dashboard

This is a small project born out of my need to be more organized. My primary way of tracking tasks at work is through Outlook. While Outlook does offer a robust calendar system, sometimes it is overkill. When the phone is ringing and my coworkers are talking to me and my email is blowing up, sometimes I just need to refocus on the tasks at hand.

So I made myself a peaceful and simple to do list!

There are definitely more features I would like to add (see: [Issues](https://github.com/mswanson-me/stay-focused/issues)), the ultimate goal is to keep this tool simple and to keep me productive.

## Usage

Visit [the live site](https://to-do.mswanson.me) and try it out. All features should be relatively apparent (if I've done my job correctly), but basically...:

* Type a new task into the text field and hit Enter to **add** it to your list
* Tasks can be marked as **completed** with the checkmark button or **deleted** with the trash can button
* No need to log in or save anything. Your list is periodically saved to localStorage and saved again when you navigate away or close the browser tab

## Caveats

* Because lists are saved in localStorage, you cannot access your list from other devices
* This is an entirely front-end application. As such, it has limitations. I will work on a database-backed version soon!

## Development Goals

* Make tasks editable
* Make tasks re-orderable
* Add per-task note taking functionality

## Feedback

Please feel free to add issues to the tracker if you'd like to see something new added or a bug fixed~
