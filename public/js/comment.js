{{#each comments as |comment|}}
    <div class="card mb-3">
        <div class="card-body">
            <p class="card-text">{{comment.comment_text}}</p>
            <p class="card-text">Posted by {{comment.user.username}} on {{comment.createdAt}}</p>  

            {{#if comment.user.id}}
                <a href="/comment/{{comment.id}}/edit" class="btn btn-primary">Edit</a>
                <a href="/comment/{{comment.id}}/delete" class="btn btn-danger">Delete</a>
            {{/if}}
    </div> 
{{/each}}