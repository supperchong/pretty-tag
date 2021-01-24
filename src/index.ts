export interface Config {
    trimStart?: boolean
    align?: boolean
    trimEnd?: boolean
}
let DefaultConfig: Config = {
    trimStart: true,
    align: true,
    trimEnd: true
}
const isSpace = (c: string) => /\s/.test(c)
const isEOL = (c: string) => /\n/.test(c)


function TagFactory(config: Config = DefaultConfig) {
    return function (strs: TemplateStringsArray, ...args: string[]): string {
        const mergeConfig: Config = {
            ...DefaultConfig,
            ...config
        }
        const tailSpaceArr = strs.slice(0, strs.length - 1).map(str => getTailSpace(str))
        args = args.map((str: string, i) => {
            const prefixSpace = tailSpaceArr[i]
            return str.split('\n').map((line, j) => {
                if (j === 0) {
                    return line
                }
                return prefixSpace + line
            }).join('\n')
        })
        let str: string = args.reduce((prev, cur, i) => prev + cur + strs[i + 1], strs[0])
        let alignPrefixSpace = ''
        let startIndex = 0
        for (let i = 0; i < str.length; i++) {
            const c = str[i]
            if (isEOL(c)) {
                startIndex = i + 1
            }
            if (!isSpace(str[i])) {
                alignPrefixSpace = str.slice(startIndex, i)
                break
            }
        }
        if (mergeConfig.trimStart) {
            str = str.trimLeft()
        }
        if (mergeConfig.trimEnd) {
            str = str.trimRight()
        }
        if (mergeConfig.align) {
            str = str.split('\n').map((v: any) => String(v).replace(alignPrefixSpace, '')).join('\n')
        }

        return str
    }
}

/**
 * get the space of tail
 * @param str 
 */
export function getTailSpace(str: string) {
    let r = []
    for (let i = str.length - 1; i >= 0; i--) {
        if (isSpace(str[i]) && !isEOL(str[i])) {
            r.push(str[i])
        } else {
            break
        }
    }
    return r.reverse().join('')
}

export const tag = TagFactory()
export function Tag(config: Config) {
    return TagFactory(config)
}
export function setDefaultConfig(config: Config) {
    DefaultConfig = {
        ...DefaultConfig,
        ...config
    }
}


