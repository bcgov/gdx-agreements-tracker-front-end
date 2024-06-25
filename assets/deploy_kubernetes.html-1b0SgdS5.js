import{_ as e,r as t,o as l,c as p,b as n,d as s,e as i,a as c}from"./app-gCSRladW.js";const o={},u=n("h1",{id:"deploying-to-kubernetes",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#deploying-to-kubernetes"},[n("span",null,"Deploying to Kubernetes")])],-1),r={href:"https://kustomize.io/",target:"_blank",rel:"noopener noreferrer"},d=c(`<ul><li>Create a folder for your deployment for this example we use <code>deployment</code></li><li>Add a <code>kustomization.yaml</code> and a <code>patch.yaml</code> to your deployment</li><li>Copy the sample code into these files and add configuration and secretes</li><li>Create images for your deployment, which needs to be accessible by your deployment, and also match the architecture of kubernetes cluster (amd/arm) <ul><li>Instructions on how to build images TBD</li></ul></li><li>View and test your deployment run <code>kubectl kustomize ./deployment</code></li><li>deploy your deployment <code>kubectl apply -k ./deployment</code></li></ul><h2 id="deploying-gdx-agreements-tracker-to-kubernetes" tabindex="-1"><a class="header-anchor" href="#deploying-gdx-agreements-tracker-to-kubernetes"><span>Deploying GDX Agreements Tracker to Kubernetes</span></a></h2><h3 id="kustomization-yaml" tabindex="-1"><a class="header-anchor" href="#kustomization-yaml"><span>kustomization.yaml</span></a></h3><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment">#/deployment/kustomization.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization
<span class="token key atrule">bases</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> github.com/bcgov/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker/deployments/kustomize/base

<span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span> test
<span class="token key atrule">images</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>app<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> yourimage<span class="token punctuation">-</span>app<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>api<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>image<span class="token punctuation">-</span>api<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bcgovgdx/gdx<span class="token punctuation">-</span>agreements<span class="token punctuation">-</span>tracker<span class="token punctuation">-</span>postgres<span class="token punctuation">-</span>run
    <span class="token key atrule">newName</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>image<span class="token punctuation">-</span>postgres<span class="token punctuation">-</span>run
    <span class="token key atrule">newTag</span><span class="token punctuation">:</span> latest
<span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> merge
    <span class="token key atrule">literals</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_DB=
      <span class="token punctuation">-</span> POSTGRES_USER=
      <span class="token punctuation">-</span> POSTGRES_HOST=
      <span class="token punctuation">-</span> NODE_ENV=test
      <span class="token punctuation">-</span> JWKSURI=
      <span class="token punctuation">-</span> CDOGS_CLIENT_ID=
      <span class="token punctuation">-</span> CDOGS_SECRET=
      <span class="token punctuation">-</span> CHES_CLIENT_ID=
      <span class="token punctuation">-</span> CHES_SECRET=
      <span class="token punctuation">-</span> COMMON_COMPONENT_CDOGS_API=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_CHES_API=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_TOKEN_HOST=&#39;&#39;
      <span class="token punctuation">-</span> COMMON_COMPONENT_TOKEN_PATH=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_TOKEN_HOST=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_TOKEN_PATH=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API_CLIENT_ID=s
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_CLIENT_SECRET=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_API=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_INTEGRATION_ID=
      <span class="token punctuation">-</span> SINGLE_SIGN_ON_ENVIRONMENT=
<span class="token key atrule">secretGenerator</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> secrets
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
    <span class="token key atrule">behavior</span><span class="token punctuation">:</span> merge
    <span class="token key atrule">literals</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_PASSWORD=
<span class="token key atrule">patchesStrategicMerge</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> patch.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="patch-yaml" tabindex="-1"><a class="header-anchor" href="#patch-yaml"><span>patch.yaml</span></a></h3><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token comment">#/deployment/patch.yaml</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_API_URL
              <span class="token key atrule">value</span><span class="token punctuation">:</span> /api
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_URL
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_CLIENT_ID
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> REACT_APP_KEYCLOAK_REALM
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function k(m,v){const a=t("ExternalLinkIcon");return l(),p("div",null,[u,n("p",null,[s("In order to deploy to a kubernetes cluster, follow these steps. "),n("a",r,[s("Kustomize"),i(a)]),s(" is used to deploy to Kubernetes.")]),d])}const y=e(o,[["render",k],["__file","deploy_kubernetes.html.vue"]]),_=JSON.parse('{"path":"/guide/GettingStarted/deploy_kubernetes.html","title":"Deploying to Kubernetes","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Deploying GDX Agreements Tracker to Kubernetes","slug":"deploying-gdx-agreements-tracker-to-kubernetes","link":"#deploying-gdx-agreements-tracker-to-kubernetes","children":[{"level":3,"title":"kustomization.yaml","slug":"kustomization-yaml","link":"#kustomization-yaml","children":[]},{"level":3,"title":"patch.yaml","slug":"patch-yaml","link":"#patch-yaml","children":[]}]}],"git":{"contributors":[{"name":"André Lashley","email":"andre.lashley@gmail.com","commits":1}]},"filePathRelative":"guide/GettingStarted/deploy_kubernetes.md"}');export{y as comp,_ as data};
