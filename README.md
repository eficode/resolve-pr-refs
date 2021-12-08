# Github Action Resolve Pull Request Refs
Tested for the following events:
- `issue_comment` - triggered on a comment on a PR
- `pull_request` - triggered on a pull request review
- `pull_request_review` - triggered on a pull request review

Using this action in a workflow that triggers on another event won't work.

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
ncc build index.ts --license licenses.txt
```

### Tag
```
git tag -a -m "Amazing new release" v1.1
git push --follow-tags
```
