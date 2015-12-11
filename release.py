#! /usr/bin/env python

import subprocess
import sys


GIT_SHOW_REF_HEARD = 'git show-ref --verify --quiet refs/heads/%s'
GIT_SHOW_REF_TAGS = 'git show-ref --verify --quiet refs/tags/%s'


def checkExistingTag(version):
  if (subprocess.call((GIT_SHOW_REF_HEARD % version).split()) == 0 or
      subprocess.call((GIT_SHOW_REF_TAGS % version).split()) == 0):
    print "Error: The tag '%s' already exists" % version
    raise Exception()


# def checkout(node):
#     if subprocess.call(('git checkout %s' % node).split(), stderr=subprocess.STDOUT, stdout=subprocess.PIPE) != 0:
#         print "Error: The git node '%s' doesn't exist" % node
#         exit(-1)


def commit(version):
  untrackedFiles = subprocess.Popen('git ls-files -o --exclude-standard'.split(), stdout=subprocess.PIPE)
  subprocess.call(('git add %s' % untrackedFiles.stdout.read().replace('\n', ' ')).split())
  subprocess.call(['git', 'commit', '-am', '"chore release: new release %s"' % version], stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
  subprocess.call(('git tag %s' % version).split())
  # print "Publishing new commit to master"
  # subprocess.call('git push origin master'.split(), stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
  print "Publishing new tag"
  subprocess.call(('git push origin %s' % version).split(), stderr=subprocess.STDOUT, stdout=subprocess.PIPE)
  print "Release %s created!" % version

# 1. check git tag
# 2. commit and push tag to github
# 3. run `gulp prod` to generate production files
# 4. copy package.json and README.md to `./build`
# 5. generate index.js to `./build`
# 6. publish to npm
if __name__ == "__main__":
  try:
    if len(sys.argv) == 1:
      print "Error: The version name is required"
      raise Exception()

      version = sys.argv[1]

      checkExistingTag(version)

      commit(version)
  except Exception as e:
    exit(-1)
