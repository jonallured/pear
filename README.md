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

## Init

Next up would be to init things so that you get a data file:

```
$ pear init
$ cat ~/.pear-data
{
  "current": [],
  "known": []
}
```

## Add known authors

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

## Add a known author to your current pairing session

Now that we have a known author we can add them to what we're working on:

```
$ pear current:add jonallured
```

This sets us up to give credit in our commits to `jonallured`. 

Note: `pear` supports multiple authors, so you can add as many authors to your current pairing session as you want!

## Credit current authors on a commit

Once you've got author(s) in your current session, you can use Pear in a number of ways to credit authors on a commit. They basically boil down to these:

### 1. Copy/paste trailer into commit message

Generate a trailer for the current pair(s): 

```
$ pear current:trailer
Co-authored-by: Jonathan Allured <jon.allured@gmail.com>
```

Manually copy/paste that trailer into your commit message, and your pair(s) will get credit!

### 2. Amend the current commit with `pear`

```
$ pear amend
Commit message amended! 🍐
```

This will magically update the most recent commit with a trailer for all authors in your current session! Your pair(s) get credit again 😎.

### 3. Automate commit trailers with a post-commit hook

The first two are more manual in case git hooks aren't your thing but hooks are
super cool and can make you feel like a genius. Impress your friends and have
the trailer added automatically!

Configure the hook to call `pear amend`, and your pair(s) will get credit as soon as you commit!!

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
