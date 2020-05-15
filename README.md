# Github Action Resolve Pull Request Refs
Tested only for `issue_comment` event. When your workflow triggers on a comment on PR, you can use this action.

TODO: test also on `pull_request` events.

## Inputs

## `token`
**Required:** Github API Token

## Outputs

## `base_ref`
Pull request base ref.

## `head_ref`
Pull request head ref.

## Example usage
```
- name: resolve pr refs
  id: refs
  uses: eficode/resolve-pr-refs@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

## Example usecase
```
on:
  issue_comment:
    types: [created]
jobs:
  fast_forward_merge:
    name: ff-merge
    if: ${{ github.event.comment.body == '/ff-merge' }}
    runs-on: ubuntu-latest
    steps:
      - name: resolve pr refs
        id: refs
        uses: eficode/resolve-pr-refs@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: checkout base
        uses: actions/checkout@v2
        with:
          ref: ${{ steps.refs.outputs.base_ref }}
      - name: fast forward merge pr
        run: |
          git fetch
          git merge --ff-only origin/${{ steps.refs.outputs.head_ref }}
          git push
```

## Building a new version

### Ensure vercel/ncc is installed
```
npm i -g @vercel/ncc
```

### Compile
```
ncc build index.js --license licenses.txt
```

### Tag
```
git tag -a -m "Amazing new release" v1.1
git push --follow-tags
```
