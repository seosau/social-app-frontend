'use client';
import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
import { Button, TextField } from "@mui/material";
import { ICommentCreateFormData, ICommentListExtra } from "@/interfaces/comment.interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postApi } from "@/apis/post.api";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { formatTimeAgo } from "@/untils";

const interactButtonSx = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  borderRadius: 1,
  textTransform: "none",
  color: "text.secondary",
  padding: 0,
  backgroundColor: '#dbeafe'
}

const schema = yup.object({
  postId: yup.string().required("PostId is required"),
  // userId: yup.string().required("UserId is required"),
  content: yup.string().required("Content is required"),
  parentId: yup.string().required().nullable(),
})

type FormData = yup.InferType<typeof schema>

const createComment = async (data: FormData) => {
  try {
    const res = await postApi.createComment(data as ICommentCreateFormData)
    alert('Reply successfully!')
  } catch (err) {
    console.error('Reply error: ', err)
    throw err
  }
}

export function Comment({ comment, onReplyClick, isChild = false }: {
  comment: ICommentListExtra;
  onReplyClick?: (comment: ICommentListExtra) => void;
  isChild?: boolean;
}) {
  const [visibleReplyInput, setVisibleReplyInput] = useState<boolean>(false);
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] })
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      postId: comment.postId,
      content: '',
      parentId: isChild ? comment.parentId : comment.id
    }
  })

  const onSubmit = (data: FormData) => {
    createCommentMutation.mutate(data);
  }

  return (
    <div
      className={`rounded-xl bg-white border border-zinc-200 px-4 py-1 mt-0.5 ${isChild ? "ml-8" : ""
        }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-medium text-zinc-900 text-sm">{comment.user.fullName}</span>
        <span className="text-xs text-zinc-500"> · {formatTimeAgo(comment.createdAt)}</span>
      </div>
      <div className="text-zinc-800 text-sm mb-0.5 whitespace-pre-line">{comment.content}</div>
      <div className="flex justify-end items-center">
        <Button
          sx={interactButtonSx}
          tabIndex={0}
          onClick={() => {
            setVisibleReplyInput(!visibleReplyInput)
            if (onReplyClick) onReplyClick(comment);
          }}
        >
          Reply
        </Button>
      </div>
      <div className={`${visibleReplyInput ? 'flex' : 'hidden'} space-x-2 mt-2`}>
        <TextField
          {...register('content')}
          type="text"
          placeholder="Type a message..."
          sx={{
            paddingY: 0
          }}
        />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          type="submit"
          sx={{
            paddingY: 0,
            marginLeft: 1,
            textTransform: "none"
          }}
        >
          Send
        </Button>
      </div>
      {comment.childs && comment.childs.length > 0 && (
        <div className="mt-2">
          {comment.childs.map((child) => (
            <Comment key={child.id} comment={child} onReplyClick={onReplyClick} isChild />
          ))}
        </div>
      )}
    </div>
  );
}

// Render a list of parent comments
type CommentListProps = {
  comments: ICommentListExtra[];
  onReplyClick?: (comment: ICommentListExtra) => void;
};

export function CommentList({ comments, onReplyClick }: CommentListProps) {
  return (
    <div className="space-y-1 w-full">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} onReplyClick={onReplyClick} />
      ))}
    </div>
  );
}
