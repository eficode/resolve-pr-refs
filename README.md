# Github Action Resolve Pull Request Refs

When your workflow triggers on a comment on PR (the `issue_comment`-event), you can use this action to resolve the Git ref for that pull-request.

## Inputs

### `token`
**Required:** Github API Token

## Outputs

### `base_ref`
Pull request base ref.

### `base_sha`
The SHA hash of the base ref.

### `head_ref`
Pull request head ref.

### `head_sha`
The SHA hash of the head ref.

## Usage

### Example usage

```yaml
- name: resolve pr refs
  id: refs
  uses: eficode/resolve-pr-refs@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

### Example usecase

```yaml
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

## Contributing

Create a PR against this repository. To test your changes, comment `/test` on your PR.

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
