import axios from "axios"

const CreateForm = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
      try {
        const allowedDomains = e.target.allowed_domains.value.split(',')

        const response = await axios.post('/forms', {
            name: e.target.name.value,
            slug: e.target.slug.value,
            description: e.target.description.value,
            allowed_domains: allowedDomains,
            limit_one_response: e.target.limit_one_response.checked,
        })

        alert('create form success')

      } catch (error) {
        alert(error.response.data.message)
      }
    }
    return (
        <main>
        <div class="hero py-5 bg-light">
           <div class="container">
              <h2>Create Form</h2>
           </div>
        </div>

        <div class="py-5">
           <div class="container">
              <div class="row">
                 <div class="col-md-6 col-lg-4">

                    <form onSubmit={handleSubmit} method="post">

                       <div class="form-group mb-3">
                          <label for="name" class="mb-1 text-muted">Form Name</label>
                          <input type="text" id="name" name="name" class="form-control" autofocus />
                       </div>


                       <div class="form-group my-3">
                          <label for="slug" class="mb-1 text-muted">Form Slug</label>
                          <input type="text" id="slug" name="slug" class="form-control" />
                       </div>


                       <div class="form-group my-3">
                          <label for="description" class="mb-1 text-muted">Description</label>
                          <textarea id="description" name="description" rows="4" class="form-control"></textarea>
                       </div>


                       <div class="form-group my-3">
                          <label for="allowed-domains" class="mb-1 text-muted">Allowed Domains</label>
                          <input type="text" id="allowed-domains" name="allowed_domains" class="form-control" />
                          <div class="form-text">Separate domains using comma ",". Ignore for public access.</div>
                       </div>


                       <div class="form-check form-switch" aria-colspan="my-3">
                          <input type="checkbox" id="limit_one_response" name="limit_one_response" class="form-check-input" role="switch"/>
                          <label class="form-check-label" for="limit_one_response">Limit to 1 response</label>
                        </div>

                       <div class="mt-4">
                          <button type="submit" class="btn btn-primary">Save</button>
                       </div>
                    </form>

                 </div>
              </div>
           </div>
        </div>
      </main>
     );
}

export default CreateForm;
