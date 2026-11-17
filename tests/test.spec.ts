import {describe, expect, it} from "vitest";
import fs from 'fs';
import {DdbApiResponse} from "../src/types";
import MarkdownBuilder from "../src/markdown.builder";
import '../src/array-extensions';
import Utilities from "../src/utilities";


it.each(fs.readdirSync('tests/ddb-characters'))('%s', async (fileName) => {

    const file = fs.readFileSync(`tests/ddb-characters/${fileName}`, 'utf-8');

    const markdown = MarkdownBuilder.buildMarkdown(JSON.parse(file) as DdbApiResponse, {
        embedDndBeyond: true,
        importSkillValues: true
    });

    await expect(markdown).toMatchFileSnapshot(`snapshots/${fileName}.md`);
});


it.each([
    [true, undefined, true],
    [false, undefined, false],
    [true, true, true],
    [true, false, false],
    [false, true, true],
    [false, false, false]
])('should import on startup', async (global, override, expected) => {
    expect(Utilities.shouldImport("importOnStartup", {importOnStartup: override, 'dndbeyond_id': '123'}, {importOnStartup: global})).toBe(expected);
});