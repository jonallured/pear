# pear [![CircleCI][badge]][circleci]

Credit where credit is due.

## Install

Since pear is an NPM package, installation can be as easy as:

```
$ npm install --global @jonallured/pear
// or
$ yarn add global @jonallured/pear
```

Note that I've got this under a namespace so you have to specify that.

### Init

Next up would be to init things so that you get a data file:

```
$ pear init
$ cat ~/.pear-data
{
  "current": [],
  "known": []
}
```

### Adding known authors

At this point you can add some known authors. That looks something like this:

```
$ pear known:add jonallured
jonallured not found
name for jonallured: Jonathan Allured
email for jonallured: jon.allured@gmail.com
Added new known authors! 🍐
$ pear known
[
  {
    "email": "jon.allured@gmail.com",
    "name": "Jonathan Allured",
    "username": "jonallured"
  }
]
```

### Adding an author

Now that we have a known author we can add them to what we're working on:

```
$ pear current:add jonallured
$ pear current:trailer
Co-authored-by: Jonathan Allured <jon.allured@gmail.com>
```

So yeah, now we can produce a trailer that will be picked up by GitHub and mark
the commit as being authored by two developers. :sunglasses:

## Workflows

Pear can be used in a number of ways, but they basically boil down to these:

* copy/paste trailer into commit message
* amend commit with trailer
* automate trailer with post commit hook

The first two are more manual in case git hooks aren't your thing but hooks are
super cool and can make you feel like a genius. Impress your friends and have
the trailer added automatically!

## Cutting a new release

The process of cutting a new release is mostly managed by CircleCI. All that
needs to be done locally is running the release script:

```
# those args are old/new version numbers
$ ./bin/release 0.0.0 0.0.1
```

This script will find the old version, replace with the new version and then do
all the git things to get GitHub updated and kick off the release job on Circle.

[badge]: https://circleci.com/gh/jonallured/pear.svg?style=svg
[circleci]: https://circleci.com/gh/jonallured/pear
