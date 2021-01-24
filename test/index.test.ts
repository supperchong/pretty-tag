import { strictEqual } from 'assert'
import { tag, Tag, getTailSpace } from '../src/index'

describe('test pretty tag', () => {
  it('should remove the beginning and end whitespace characters', () => {
    const str = tag`
		<div>
			<span>test</span>
		</div>
		`
    const str2 = `<div>
	<span>test</span>
</div>`
    strictEqual(str, '<div>\n\t<span>test</span>\n</div>')
    strictEqual(str, str2)
  })

  it('should align left', () => {
    const str = tag`
		let a={
			foo:b
		}
		`
    strictEqual(str, 'let a={\n\tfoo:b\n}')
  })
  it('should only remove the beginning whitespace characters', () => {
    const tag = Tag({
      trimEnd: false,
      align: false,
    })
    const str = tag`
		let a={
			foo:b
		}
		`
    strictEqual(str, 'let a={\n\t\t\tfoo:b\n\t\t}\n\t\t')
  })
  it('should only remove the end whitespace characters', () => {
    const tag = Tag({
      trimStart: false,
      trimEnd: true,
      align: false,
    })
    const str = tag`
		let a={
			foo:b
		}
		`
    strictEqual(str, '\n\t\tlet a={\n\t\t\tfoo:b\n\t\t}')
  })
  it('should remove the beginning and end whitespace characters nested', () => {
    const code = tag`
		<div>
			<span>test</span>
		</div>
		`
    const str = tag`
		<div>
			${code}
		</div>
		`
    strictEqual(str, '<div>\n\t<div>\n\t\t<span>test</span>\n\t</div>\n</div>')
  })
})

describe('test getTailSpace', () => {
  it('should return the space of tail', () => {
    let demos = [
      {
        str: 'test   ',
        space: '   ',
      },
      {
        str: 'test  ',
        space: '  ',
      },
      {
        str: 'test',
        space: '',
      },
    ]
    demos.forEach(demo => {
      const r = getTailSpace(demo.str)
      strictEqual(r, demo.space)
    })
  })
})
