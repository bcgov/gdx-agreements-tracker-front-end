import{_ as e,o as a,c as n,a as s}from"./app-rA2xiQQ_.js";const t={},o=s(`<h1 id="report-parameters" tabindex="-1"><a class="header-anchor" href="#report-parameters"><span>Report Parameters</span></a></h1><h2 id="description" tabindex="-1"><a class="header-anchor" href="#description"><span>Description</span></a></h2><p>The <code>ReportParameters</code> component is responsible for rendering form inputs based on the selected report category and type. It dynamically generates form inputs for various parameters such as fiscal year, portfolio, contractor name, contract, date, quarter, project type, project, and subcontractor. The component uses Material-UI&#39;s <code>FormInput</code> component for rendering the form inputs.</p><h2 id="props" tabindex="-1"><a class="header-anchor" href="#props"><span>Props</span></a></h2><ul><li><code>values</code>: An object containing the current form values.</li><li><code>setFieldValue</code>: A function to set form field values.</li><li><code>categoriesAndTypes</code>: An array containing the list of report categories and types.</li><li><code>touched</code>: An object containing the current touched state of form fields.</li></ul><h2 id="state" tabindex="-1"><a class="header-anchor" href="#state"><span>State</span></a></h2><p>None</p><h2 id="functions" tabindex="-1"><a class="header-anchor" href="#functions"><span>Functions</span></a></h2><ul><li><code>renderComponent(parameter: IReportCategoriesAndTypesParameters)</code>: A function that takes a parameter object and returns a <code>FormInput</code> component based on the parameter&#39;s label.</li></ul><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>Usage</span></a></h2><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ReportParameters</span></span>
  <span class="token attr-name">values</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>values<span class="token punctuation">}</span></span>
  <span class="token attr-name">setFieldValue</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>setFieldValue<span class="token punctuation">}</span></span>
  <span class="token attr-name">categoriesAndTypes</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>categoriesAndTypes<span class="token punctuation">}</span></span>
  <span class="token attr-name">touched</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>touched<span class="token punctuation">}</span></span>
<span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),r=[o];function c(p,i){return a(),n("div",null,r)}const u=e(t,[["render",c],["__file","ReportParameters.html.vue"]]),d=JSON.parse('{"path":"/guide/Frontend/react_components/ReportSelector/ReportParameters.html","title":"Report Parameters","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Description","slug":"description","link":"#description","children":[]},{"level":2,"title":"Props","slug":"props","link":"#props","children":[]},{"level":2,"title":"State","slug":"state","link":"#state","children":[]},{"level":2,"title":"Functions","slug":"functions","link":"#functions","children":[]},{"level":2,"title":"Usage","slug":"usage","link":"#usage","children":[]}],"git":{"contributors":[{"name":"ASpiteri-BCGov","email":"49036255+ASpiteri-BCGov@users.noreply.github.com","commits":1}]},"filePathRelative":"guide/Frontend/react_components/ReportSelector/ReportParameters.md"}');export{u as comp,d as data};
